import React from 'react';
import Image from 'next/image';
import '../tailwind-output.css';

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="bg-brand p-10">
        <div>
          <Image
            src="/favicon.ico"
            alt="logo"
            width={16}
            height={16}
            className="h-auto"
          />
          <div className="space-y-5 text-white">
            <h1 className="h1">Manage Your Space the best way possible</h1>
            <p className="body-1">
              This is a spot where you can seamlessly manage all your documents
            </p>
          </div>
        </div>
      </section>
      {children}
    </div>
  );
};

export default layout;
