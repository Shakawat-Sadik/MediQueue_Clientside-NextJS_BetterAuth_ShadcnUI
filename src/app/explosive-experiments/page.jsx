import React from 'react';

const ExplosiveExperimentsPage = async () => {
    try {
        const result = await fetch(`${process.env.REMOTE_SERVER_URL}/doctors?limit=1000`);
        // const data = await result.json();
        
        console.log("Fetched doctors data:", result);
    } catch (error) {
        console.error("Failed to fetch doctors:", error.message);
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-r from-card to-accent">
            <h2 className="text-5xl text-chart-5 dark:text-chart-1 font-bold text-center mt-10">Explosive Experiments in running</h2>
            <p className="text-center mt-4 text-lg">
                Check the console
            </p>
        </div>
    );
};

export default ExplosiveExperimentsPage;