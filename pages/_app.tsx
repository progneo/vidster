import Layout from '../components/layout/main'
import Fonts from '../components/fonts'
import {NextRouter} from "next/router";
import React from "react";
import Chakra from "@/components/chakra";

if (typeof window !== 'undefined') {
    window.history.scrollRestoration = 'manual'
}

interface WebsiteProps {
    Component: React.ElementType
    router: NextRouter
}

function Website({Component, router, ...pageProps}: WebsiteProps) {
    return (
        <Chakra cookies={pageProps.cookies}>
            <Fonts/>
            <Layout router={router}>
                <Component {...pageProps} key={router.route}/>
            </Layout>
        </Chakra>
    )
}

export default Website