import React from 'react';

interface Props {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  direction?: 'row' | 'col';
}

export const FooterCol = ({ title, icon, children, direction = 'col' }: Props) => (
  <div className="flex flex-col items-center md:items-center">
    <h3 className="text-lg md:text-2xl mb-4 md:mb-8 uppercase flex items-center justify-center md:justify-start">
      {icon}
      <span className="ml-4">{title}</span>
    </h3>
    <nav>
      <ul
        className={`
    flex
    ${direction === 'row'
            ? 'flex-row flex-wrap justify-center md:justify-start gap-4 md:gap-6'
            : 'flex-col gap-2 md:gap-4'
          }`}
      >
        {children}
      </ul>
    </nav>
  </div>
);