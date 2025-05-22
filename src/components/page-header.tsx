import type { FC, ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string | ReactNode;
  actions?: ReactNode;
}

export const PageHeader: FC<PageHeaderProps> = ({ title, description, actions }) => {
  return (
    <div className="mb-6  ">
      <div className=" flex flex-col  md:flex-row md:items-center md:justify-between gap-4">
        <div className=' m-auto'>
          <h2 className="text-2xl font-bold  md:text-3xl text-foreground text-center">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground md:text-base text-center">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
