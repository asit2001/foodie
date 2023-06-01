import Order from "../components/Order"
import Nav from "../components/navbar"
import Styles from "./styles/Account.module.css"
import CheckOutStyle from "./styles/CheckOut.module.css"
function HelpPage() {
  return (
    <>
      <Nav />
      <main className={Styles.body}>
      <div className={Styles.container}>
          <div className={Styles.profile}>
            <h2 className={Styles.userName}>Help & Support</h2>
            <p className={Styles.userEmail}>Let's take a step ahead and help you better.</p>
          </div>
          <div className={Styles.user__details}>
            <div className={Styles.options}>
                <p style={{ color: "var(--color-dark-black)"}} className={`${CheckOutStyle.option__active} ${CheckOutStyle.option__text}`}>Help with orders</p>
                <p className={`${CheckOutStyle.option} ${CheckOutStyle.option__text}`}>General issues</p>
                <p className={`${CheckOutStyle.option} ${CheckOutStyle.option__text}`}>Partner Onboarding</p>
                <p className={`${CheckOutStyle.option} ${CheckOutStyle.option__text}`}>Legal, Terms & Conditions</p>
                <p className={`${CheckOutStyle.option} ${CheckOutStyle.option__text}`}>FAQs</p>
            </div>
            <div className={Styles.option__details}>
            <Order />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default HelpPage