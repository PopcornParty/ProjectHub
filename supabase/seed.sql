-- Catalog data only. No fake users or fake projects.

insert into public.categories (name, slug, sort_order) values
  ('Minecraft', 'minecraft', 10),
  ('Discord', 'discord', 20),
  ('Coding', 'coding', 30),
  ('Web Development', 'web-development', 40),
  ('Game Development', 'game-development', 50),
  ('YouTube', 'youtube', 60),
  ('Video Editing', 'video-editing', 70),
  ('Graphic Design', 'graphic-design', 80),
  ('Roblox', 'roblox', 90),
  ('Fortnite', 'fortnite', 100),
  ('Other', 'other', 110)
on conflict (slug) do nothing;

insert into public.skills (name, slug, kind) values
  ('HTML', 'html', 'language'),
  ('CSS', 'css', 'language'),
  ('JavaScript', 'javascript', 'language'),
  ('TypeScript', 'typescript', 'language'),
  ('Python', 'python', 'language'),
  ('Java', 'java', 'language'),
  ('C#', 'csharp', 'language'),
  ('C++', 'cpp', 'language'),
  ('Lua', 'lua', 'language'),
  ('GitHub', 'github', 'tool'),
  ('Minecraft', 'minecraft', 'game'),
  ('Minecraft Bedrock', 'minecraft-bedrock', 'game'),
  ('Minecraft Java', 'minecraft-java', 'game'),
  ('Redstone', 'redstone', 'skill'),
  ('Commands', 'commands', 'skill'),
  ('Add-ons', 'add-ons', 'skill'),
  ('Discord Bots', 'discord-bots', 'skill'),
  ('Discord Server Management', 'discord-server-management', 'skill'),
  ('Graphic Design', 'graphic-design', 'skill'),
  ('Video Editing', 'video-editing', 'skill'),
  ('3D Modelling', '3d-modelling', 'skill'),
  ('Blender', 'blender', 'tool'),
  ('Unity', 'unity', 'tool'),
  ('Unreal Engine', 'unreal-engine', 'tool'),
  ('Roblox Studio', 'roblox-studio', 'tool'),
  ('Roblox', 'roblox', 'game'),
  ('Fortnite', 'fortnite', 'game'),
  ('YouTube', 'youtube', 'interest'),
  ('Building', 'building', 'skill'),
  ('Pixel Art', 'pixel-art', 'skill'),
  ('UI Design', 'ui-design', 'skill'),
  ('Music', 'music', 'skill'),
  ('Writing', 'writing', 'skill'),
  ('Community Management', 'community-management', 'skill')
on conflict (slug) do nothing;

insert into public.tags (name, slug) values
  ('beginner-friendly', 'beginner-friendly'),
  ('modpack', 'modpack'),
  ('survival', 'survival'),
  ('minigames', 'minigames'),
  ('smp', 'smp'),
  ('open-source', 'open-source'),
  ('learning', 'learning'),
  ('serious', 'serious'),
  ('casual', 'casual'),
  ('long-term', 'long-term')
on conflict (slug) do nothing;
