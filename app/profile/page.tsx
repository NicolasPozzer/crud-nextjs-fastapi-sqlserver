// app/profile/page.tsx
'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

const Profile = () => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!user) return <div>Please log in</div>;

    return (
        <div>
            <h1>Profile</h1>
            <p>Welcome, {user.name}!</p>
        </div>
    );
};

export default Profile;
