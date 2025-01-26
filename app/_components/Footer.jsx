import Image from 'next/image';
import React from 'react';

function Footer() {
  return (
    <div>
      <footer className="bg-black p-2">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center gap-3">
            <Image src="/newlogo.svg" width={40} height={40} alt="Expensify logo" />
            <h2 className="text-teal-500 text-2xl font-serif">Expensify</h2>
          </div>
          <p className="mx-auto mt-6 max-w-md text-center text-gray-400">
            Spend Smart, Split Right, Save Better.
          </p>
          <ul className="mt-12 flex flex-wrap justify-center gap-8 text-gray-400">
            <li>
              <a
                className="transition hover:text-teal-500"
                href="https://drive.google.com/file/d/1mPCMXuuO6Vg-Br6sJITSLTqZFdcgjtLS/view?usp=sharing"
              >
                Resume
              </a>
            </li>
            <li>
              <a
                className="transition hover:text-teal-500"
                href="#"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                className="transition hover:text-teal-500"
                href="#"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="transition hover:text-teal-500"
                href="#"
              >
                Projects
              </a>
            </li>
          </ul>

          <ul className="mt-12 flex justify-center gap-6">
            <li>
              <a
                href="#"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-teal-500 transition"
              >
                <span className="sr-only">Facebook</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/mananupmanyu/"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-teal-500 transition"
              >
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M20 2H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V4a2 2 0 00-2-2zM8.667 18H6v-9.333h2.667V18zM7.333 7.667A1.333 1.333 0 116 6.334a1.333 1.333 0 011.333 1.333zM18 18h-2.667v-4c0-1.6-2-1.467-2 0v4H10.667v-9.333H13v1.2c.933-1.667 5-1.8 5 1.6V18z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/mananx01"
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-teal-500 transition"
              >
                <span className="sr-only">GitHub</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
