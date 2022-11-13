/* eslint-disable @next/next/no-sync-scripts */
import { NextPage } from "next"
import HeaderSection from "@/components/sections/header"
import FooterSection from "@/components/sections/footer"
import "../styles/globals.scss"

const DFApp: NextPage = ({ Component, pageProps }: any) => {
    return (
        <>
            <HeaderSection />
            <Component {...pageProps} />
            <FooterSection />
            <script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GMP_API_KEY}&libraries=places`} />
        </>
    )
}

export default DFApp
