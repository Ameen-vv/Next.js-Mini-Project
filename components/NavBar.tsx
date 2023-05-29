'use client'
import Link from "next/link"
import Image from "next/image"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import { useEffect, useState } from "react"

const NavBar: React.FC = () => {

    const [userLogged, setUserLogged] = useState<boolean>(true)
    const [providers, setProviders] = useState(null)
    const [dropDown,setDropDown] = useState<boolean>(false)

    useEffect(() => {
        const setProviders = async () => {
            const response = await getProviders()

            setProviders(response)
        }
        setProviders();
    }, [])



    return (
        <nav className="flex-between w-full mb-16 pt-3">
            <Link href='/' className="flex gap-2 flex-center">
                <Image src='/assets/images/logo.svg' alt="LOGO" width={30} height={30} className="object-contain" />
                <p className="logo_text">Heading</p>
            </Link>
            <div className="sm:flex hidden">
                {
                    userLogged ? (
                        <div className="flex gap-3 md:gap-5">
                            <Link href='/create-prompt' className="black_btn">
                                create post
                            </Link>

                            <button type="button" onClick={signOut} className="outline_btn">
                                signOut
                            </button>

                            <Link href='/profile'>
                                <Image
                                    src='/assets/images/logo.svg'
                                    width={36}
                                    height={36}
                                    className="rounded-full"
                                    alt="Profile"
                                />
                            </Link>
                        </div>

                    ) : (
                        <>
                            {providers &&
                                Object.values(providers).map((provider) => (
                                    <button
                                        type="button"
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className="black_btn"
                                    >
                                        Sign In
                                    </button>
                                ))

                            }

                        </>
                    )
                }
            </div>
            <div className="sm:hidden flex relative">
                {userLogged ? (
                    <div className="flex">
                        <Image
                            src='/assets/images/logo.svg'
                            width={36}
                            height={36}
                            className="rounded-full"
                            alt="Profile"
                            onClick={() => setDropDown(prev => !prev)}
                        />
                        {dropDown && (
                            <div className="dropdown">
                                <Link
                                  href='/profile'
                                  className="dropdown_link"
                                  onClick={() => setDropDown(false)}  
                                >
                                    My Profile
                                </Link>
                                <Link
                                  href='/create-prompt'
                                  className="dropdown_link"
                                  onClick={() => setDropDown(false)}  
                                >
                                    Create Prompt
                                </Link>
                                <button
                                   type="button"
                                   onClick={() => {
                                    setDropDown(false)
                                    signOut()
                                    }}
                                    className="mt-5 w-full black_btn"
                                >
                                    Sign Out
                                </button>
                                
                            </div>
                        )

                        }
                    </div>

                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))

                        }

                    </>
                )

                }

            </div>
        </nav>
    )
}

export default NavBar
