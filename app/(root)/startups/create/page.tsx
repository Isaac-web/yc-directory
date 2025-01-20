import StartupForm from '@/components/startup-form';
import React from 'react';

const CreateStartupPage = () => {
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Submit Your Startup</h1>
      </section>

      <section>
        <StartupForm />
      </section>
    </>
  );
};

export default CreateStartupPage;
