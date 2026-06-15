export default async function hey() {

    const result = await fetch(`${process.env.REMOTE_SERVER_URL}/doctors?limit=1000`);
    // const data = await result.json();
    
    if (!result.ok || !data.success) {
        console.error("Failed to fetch doctors:", data.message);
        return <div className="text-center text-red-500">Failed to load doctors. Please try again later.</div>;
    }

    console.log("Fetched doctors data:", result);
}