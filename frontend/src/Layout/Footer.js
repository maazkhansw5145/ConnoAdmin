import React from "react";
import "./Footer.css";

// Icons
import twitterIcon from "../Assets/twitter.svg";
import discordIcon from "../Assets/discord.svg";
import gmailIcon from "../Assets/gmail.svg";

function Footer() {
  return (
    <div className="footer">
      <div className="copyright">©ProfitOutcome 2022</div>
      <></>
      <div className="socialLinks">
        <a href="./" className="icons">
          <img alt="discord" height="40px" src={discordIcon}></img>
        </a>

        <></>

        <a href="./" className="icons">
          <img alt="twitter" height="40px" src={twitterIcon}></img>
        </a>

        <></>

        <a href="mailto:profitoutcome@gmail.com" className="icons">
          <img alt="gmail" height="40px" src={gmailIcon}></img>
        </a>
      </div>
    </div>
  );
}

export default Footer;
