import { Navbar } from '@/components/portfolio/Navbar';
import { Footer } from '@/components/portfolio/Footer';
import { CustomCursor } from '@/components/portfolio/CustomCursor';
import { SocialIcons } from '@/components/portfolio/SocialIcons';
import { Outlet } from 'react-router-dom';

export function Layout() {
    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
            <CustomCursor />
            <Navbar />
            <main className="flex-grow pt-16">
                <Outlet />
            </main>
            <SocialIcons />
            <Footer />
        </div>
    );
}
