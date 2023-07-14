'use client';

import clsx from 'clsx';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TbMoonStars, TbSunLow } from 'react-icons/tb';

const menuItems = [
  { title: 'About', pathname: '/about' },
  { title: 'Projects', pathname: '/projects' },
];

export default function Navbar() {
  const segments = useSelectedLayoutSegments();

  return (
    <nav className="mx-auto flex max-w-screen-md items-center justify-between px-4 pt-4 md:px-8">
      <Link href="/" className="py-2">
        Brandon Carlisle
      </Link>

      <div className="flex items-center justify-center gap-1">
        <ul className="flex gap-[2px]">
          {menuItems.map((item) => (
            <li key={item.pathname}>
              <Link
                className={clsx(
                  'rounded-md px-2 underline-offset-2 hover:underline',
                  item.pathname.slice(1) === segments[0] && 'underline',
                )}
                href={item.pathname}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="group h-8 w-8 rounded-md bg-zinc-200 dark:bg-zinc-800">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}

function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-full w-full p-2">
        <div
          style={{ borderTopColor: 'transparent' }}
          className="h-full w-full animate-spin rounded-full border-2 border-blue-800 dark:border-blue-300"
        ></div>
      </div>
    );
  }

  const handleThemeSwitch = () => {
    if (theme === 'light') {
      setTheme('dark');
    }

    if (theme === 'dark') {
      setTheme('light');
    }
  };

  return (
    <button
      className="flex h-full w-full items-center justify-center p-1"
      onClick={handleThemeSwitch}
    >
      {theme === 'dark' && (
        <TbSunLow className="h-full w-full text-zinc-800 transition-all group-hover:scale-105 group-active:scale-100 dark:text-zinc-100" />
      )}

      {theme === 'light' && (
        <TbMoonStars className="h-[90%] w-[90%] text-zinc-800 transition-all group-hover:scale-105 group-active:scale-100 dark:text-zinc-100" />
      )}
    </button>
  );
}
