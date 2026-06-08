import './Header.css';

export default function Header() {
  return (
    <header className="app-header" id="app-header">
      <div className="header-accent-line" />
      <div className="title-group">
        <img
          src="/assets/genie.svg"
          alt="Genie"
          className="genie-icon-img"
        />
        <div className="title-text">
          <h1>Gift Genie</h1>
          <p className="tagline">Summon the perfect gift</p>
        </div>
      </div>
      <div className="header-accent-line header-accent-line--bottom" />
    </header>
  );
}
