import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Field, Input, Textarea, Select } from "@/components/ui/Input";
import { createProject, deleteProject, fetchProjectBySlug, updateProject } from "@/services/projects";
import { fetchCategories } from "@/services/catalog";
import type { Category } from "@/types";

export function ProjectFormPage() {
  const { slug } = useParams();
  const { profile, user, signInWithDiscord } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category_id, setCategory] = useState("");
  const [status, setStatus] = useState("recruiting");
  const [teamCurrent, setTeamCurrent] = useState(1);
  const [teamMax, setTeamMax] = useState(4);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => { void fetchCategories().then(setCategories); }, []);
  useEffect(() => {
    if (!slug) return;
    void fetchProjectBySlug(slug).then((p) => {
      if (!p) return;
      setId(p.id);
      setName(p.name);
      setDescription(p.description);
      setCategory(p.category_id || "");
      setStatus(p.status);
      setTeamCurrent(p.team_size_current || 1);
      setTeamMax(p.team_size_max || 4);
    });
  }, [slug]);

  if (!profile || !user) {
    return <Button onClick={() => void signInWithDiscord()}>Sign in with Discord</Button>;
  }

  function payload() {
    const current = Math.max(1, Number(teamCurrent) || 1);
    const max = Math.max(current, Number(teamMax) || current);
    return {
      ownerId: user.id,
      name,
      description,
      category_id: category_id || null,
      status,
      experience_level: "any",
      age_range: "any",
      time_commitment: "casual",
      platform: "",
      roles_needed: ["Teammates"],
      team_size_current: current,
      team_size_max: max,
      discord_contact: profile.discord_username || "",
      links: [] as { label: string; url: string }[],
      skillIds: [] as string[],
      tagNames: [] as string[],
    };
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (id) {
        await updateProject(id, payload());
        navigate(`/project/${slug}`);
      } else {
        const created = await createProject(payload());
        navigate(`/project/${created.slug}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save project");
    }
  }

  async function onDelete() {
    if (!id) return;
    if (!confirm("Delete this project? This cannot be undone.")) return;
    await deleteProject(id);
    navigate("/dashboard");
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-4">
      <h1 className="font-display text-3xl font-bold">{id ? "Edit project" : "New project"}</h1>
      <Field label="Name"><Input value={name} onChange={(e) => setName(e.target.value)} required /></Field>
      <Field label="Description"><Textarea value={description} onChange={(e) => setDescription(e.target.value)} required /></Field>
      <Field label="Category">
        <Select value={category_id} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Other</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </Select>
      </Field>
      <Field label="Status">
        <Select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="recruiting">Recruiting</option>
          <option value="planning">Planning</option>
          <option value="in_development">In development</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </Select>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="People you have now" hint="Include yourself">
          <Input type="number" min={1} max={50} value={teamCurrent} onChange={(e) => setTeamCurrent(Number(e.target.value))} />
        </Field>
        <Field label="People you want in total">
          <Input type="number" min={1} max={50} value={teamMax} onChange={(e) => setTeamMax(Number(e.target.value))} />
        </Field>
      </div>
      {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      <Button type="submit">{id ? "Save changes" : "Create project"}</Button>
      {id ? (
        <Button type="button" variant="danger" className="w-full" onClick={() => void onDelete()}>
          Delete project
        </Button>
      ) : null}
    </form>
  );
}
