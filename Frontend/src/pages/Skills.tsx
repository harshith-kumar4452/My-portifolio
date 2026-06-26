import { SkillsSection } from '@/components/portfolio/SkillsSection';
import { TechStack } from '@/components/portfolio/TechStack';

export default function Skills() {
    return (
        <div className="flex flex-col w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 gap-12">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
                    Interactive <span className="text-gradient">3D Tech Stack</span>
                </h1>
                <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground">
                    Hover and grab the spheres to interact with my technology stack. They respond to physics and your cursor movements!
                </p>
            </div>
            
            <TechStack />
            
            <SkillsSection />
        </div>
    );
}
