import React from 'react';
import { Button } from '@/components/ui/button';

const NotFoundPage = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-7xl font-bold">404</h1>
            <p className="text-muted-foreground text-2xl">
                Oops! The page you're looking for doesn't exist.
            </p>
            <Button variant="outline" >
                <a href="/">Go back home</a>
            </Button>
        </div>
    );
};

export default NotFoundPage;