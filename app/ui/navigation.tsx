import Link from "next/link";
import Image from "next/image";

export default function Navigation({ 
        logo, 
        logoMobile,
        menuItems = [], 
        className = "" 
    } : { 
        className?: string,
        logo: { src: string, href: string, alt: string, width: number, height: number }, 
        logoMobile: { src: string, href: string, alt: string, width: number, height: number }, 
        menuItems: { href: string, name: string }[]
    }) {
    return (
        <div className={`${className}`}>
            <nav className={`flex items-center justify-between py-4 px-6`}>
                
                {/* Logo */}
                {logo?.src && (
                    <Link href={logo.href || "/"} className="flex items-center">
                        {/* Mobile Logo - shows on small screens */}
                        {logoMobile?.src && (
                            <Image
                                src={logoMobile.src}
                                alt={logoMobile.alt || logo.alt || "Logo"}
                                width={logoMobile.width}
                                height={logoMobile.height}
                                className="h-auto w-auto md:hidden"
                            />
                        )}
                        
                        {/* Desktop Logo - shows on medium screens and up */}
                        {logo?.src && (
                            <>
                                <Image
                                    src={logo.src}
                                    alt={logo.alt || "Logo"}
                                    width={logo.width || 100}
                                    height={logo.height || 100}
                                    className={`h-auto w-auto ${logoMobile?.src ? 'hidden md:block' : ''}`}
                                />
                                <h1 className={`font-serif font-semibold ${logoMobile?.src ? 'hidden md:block' : ''}`} style={{fontSize: '2.25rem', marginLeft: "1.25rem"}}>TBHC Phonebook</h1>
                            </>
                        )}
                        
                    </Link>
                )}

                {/* Navigation Items */}
                <div className="flex space-x-6">
                    {menuItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="text-lg hover:opacity-70 transition-opacity font-serif cursor-pointer"
                    >
                        {item.name}
                    </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
}
