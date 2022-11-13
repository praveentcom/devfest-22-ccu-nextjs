import { Popover } from "@headlessui/react"
import { NextPage } from "next"
import Image from "next/image"
import Link from "next/link"

const HeaderSection: NextPage = () => {

    return (
        <Popover className="sticky top-0 z-20 bg-white border-b border-gray-100">
            <div className="px-6 mx-auto max-w-7xl sm:px-8">
                <div
                    className={`flex items-center py-4 border-gray-100 min-h-80 justify-center md:space-x-2`}>
                    <div
                        className={`flex justify-center`}>
                        <Link
                            passHref
                            href={"/"}>
                            <div className="cursor-pointer contents">
                                <span className="sr-only">DevFest Logo</span>
                                <Image
                                    src={`/gdg.svg`}
                                    height={16}
                                    width={200}
                                    alt="Logo"
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </Popover>
    )
}

export default HeaderSection
