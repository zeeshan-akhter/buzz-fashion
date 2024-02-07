import "./Footer.css";

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="social-links">
          <a
            className="social-pill"
            href="https://github.com/zeeshan-akhter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
          <a
            className="social-pill"
            href="https://twitter.com/zeeshan__akhter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a
            className="social-pill"
            href="https://www.linkedin.com/in/zeeshan-akhter-4b1766216/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </div>
        <div className="copyright-text">
          <span>
            Made with{" "}
            <span role="img" aria-label="red-heart">
              ❤️
            </span>{" "}
            by{" "}
            <span style={{ fontWeight: "600", margin: "0px 6px 0px 0px" }}>
              Zeeshan Akhter
            </span>
          </span>
          &copy; {new Date().getFullYear()} BUZZ FASHION
        </div>
      </footer>
    </>
  );
};
