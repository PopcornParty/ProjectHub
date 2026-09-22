export function PrivacyPage() {
  return (
    <article className="prose-invert mx-auto max-w-2xl space-y-4 text-sm text-zinc-300">
      <h1 className="font-display text-3xl font-bold text-white">Privacy</h1>
      <p>
        ProjectHub stores the public profile information you choose to share, your Discord connection details needed
        for sign-in, projects you create, saved projects, blocks and reports.
      </p>
      <p>We do not ask for your email on the public profile, phone number, home address, school name or exact birthday.</p>
      <p>There is no in-app inbox. Contact happens on Discord, which has its own rules and privacy settings.</p>
      <p>You can make your profile private, stop appearing on the People page, or delete your account from Settings.</p>
    </article>
  );
}

export function GuidelinesPage() {
  return (
    <article className="mx-auto max-w-2xl space-y-4 text-sm text-zinc-300">
      <h1 className="font-display text-3xl font-bold text-white">Safety guidelines</h1>
      <ul className="list-disc space-y-2 pl-5">
        <li>Do not share emails, phone numbers, home addresses, school names or passwords.</li>
        <li>Use age ranges, not exact birthdays.</li>
        <li>Talk on Discord only when you are comfortable. You can block and report on ProjectHub.</li>
        <li>No scams, spam, harassment or fake accounts.</li>
        <li>Projects should be honest about what they are and who they need.</li>
      </ul>
    </article>
  );
}
