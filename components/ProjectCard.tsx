import clsx from 'clsx';
import { type Project } from 'contentlayer/generated';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <>
      <Link
        key={project._id}
        href={`/projects/${project.slug}`}
        className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-blue-400/50 p-8 transition-all duration-500 hover:border-blue-500/80 dark:border-blue-900/30 dark:hover:border-blue-900"
      >
        <div className="transition-all ease-in-out group-hover:scale-[1.02]">
          <div>
            <p className="mb-4 text-sm font-semibold uppercase text-zinc-600 dark:text-zinc-400">
              {project.title}
            </p>
            <p className="mb-2">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-x-2">
            {project.featured && <InfoBadge text="Featured" style="primary" />}
            {project.tags.map((tag) => (
              <InfoBadge key={tag} text={tag} style="secondary" />
            ))}
          </div>
        </div>
      </Link>
    </>
  );
}

interface InfoBadgeProps {
  text: string;
  style: 'primary' | 'secondary';
}

const styleColors = {
  primary: {
    borderColor: 'border-green-500',
  },
  secondary: {
    borderColor: 'border-zinc-600',
  },
};

export function InfoBadge({ text, style }: InfoBadgeProps) {
  return (
    <span
      className={clsx(
        'align-center my-1 flex w-max rounded-full border-2 px-4 py-2 text-xs font-semibold text-gray-600 dark:text-gray-400',
        styleColors[style].borderColor,
      )}
    >
      {text}
    </span>
  );
}
