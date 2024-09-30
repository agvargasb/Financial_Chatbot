
import styles from "../style";
import { Billing, Business, CardDeal, Clients, CTA, Stats, Testimonials, Hero } from "../components";

import React from 'react'


const Home = ( )=> {
    return (
    <div className="bg-primary w-full overflow-hidden">
        <div className={`bg-primary ${styles.flexStart}`}>
            <div className={`${styles.boxWidth}`}>
                <Hero />
            </div>
        </div>
        <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Stats />
                <Business />
                <Billing />
                <CardDeal />
                <Testimonials />
                <Clients />
                <CTA />
            </div>
        </div>
    </div>)
}

export default Home