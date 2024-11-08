// src/components/auth/SignInSignUpDropdown.jsx

"use client";

import { useState, useEffect } from "react";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FaApple, FaGoogle, FaYandex } from "react-icons/fa";

const getProviderIcon = (providerName) => {
    switch(providerName){
        case "Google": return <FaGoogle />
        case "Apple": return <FaApple />
        case "Yandex": return <FaYandex />
    }
}

const SignInSignUpDropdown = () => {
    const [activeTab, setActiveTab] = useState("login");

    const { data: session } = useSession();
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        const setAuthProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };

        setAuthProviders();
    }, []);

      // translations
  const t = useTranslations('Navigation');

    return (
        <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="px-4 py-2 bg-blue-700 text-white rounded-md">
                    {t('login')}
            </MenuButton>

            <MenuItems className="absolute right-0 mt-5 w-72 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg focus:outline-none">
                <div className="p-4">
                    <div className="flex flex-col justify-around gap-2">
                        {providers &&
                            Object.values(providers).map((provider, index) => (
                                <button
                                    onClick={() => signIn(provider.id)}
                                    key={index}
                                    className="flex items-center justify-center text-white bg-gray-700 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 gap-1 w-full"
                                >
                                    {getProviderIcon(provider.name)} <span> {provider.name}</span>
                                </button>
                            ))}
                    </div>
                </div>
            </MenuItems>
        </Menu>
    );
};

export default SignInSignUpDropdown;
