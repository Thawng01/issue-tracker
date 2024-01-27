"use client";
import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { BsBugFill } from "react-icons/bs";

const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
];
const NavBar = () => {
    const currentPath = usePathname();
    return (
        <nav className="flex space-x-6 px-6 h-14 items-center border-b">
            <Link href="/">
                <BsBugFill className="text-2xl" />
            </Link>
            <ul className="flex space-x-6">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={classNames({
                            "text-zinc-900": currentPath === link.href,
                            "text-zinc-500": currentPath !== link.href,
                            "hover:text-zinc-800 transition-colors": true,
                        })}
                    >
                        {link.label}
                    </Link>
                ))}
            </ul>
        </nav>
    );
};

export default NavBar;
