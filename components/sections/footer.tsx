import { NextPage } from "next"
import React from "react"

const FooterSection: NextPage = () => {
    return (
        <footer>
            <div className="px-4 py-12 mx-auto overflow-hidden max-w-2xl sm:px-6 lg:px-8">
                <p className="mt-8 text-base text-center text-gray-400">
                    The data collected in this application is for demonstration purposes only.
                    If any data is stored on the server, it data will be purged as soon as the session is completed.
                    <br></br><br></br>
                    &copy; 2022 Praveen Thirumurugan. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default FooterSection
