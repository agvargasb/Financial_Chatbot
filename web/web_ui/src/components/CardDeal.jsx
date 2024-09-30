import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Discover how fAInancial  <br className="sm:block hidden" /> can supercharge your research.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        Try it now for free
      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%] rounded-lg overflow-hidden border-4 border-transparent shadow-lg hover:shadow-xl transition duration-300" />
    </div>
  </section>
);

export default CardDeal;