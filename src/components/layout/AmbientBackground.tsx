/** Fond animé très lent, en CSS pur (aucun JavaScript, uniquement des transformations GPU). */
export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__blob ambient__blob--a" />
      <div className="ambient__blob ambient__blob--b" />
      <div className="ambient__blob ambient__blob--c" />
      <svg className="ambient__shape ambient__shape--a" viewBox="0 0 200 200" fill="none">
        <path
          d="M47.5 31.4C68 13.5 108.8 8.6 134.6 22.8c25.8 14.2 41 48.5 40.3 79.2-.7 30.7-17.4 57.9-42 71.6-24.6 13.7-57 13.9-80.2-1.8-23.2-15.7-37.2-47.3-34.3-75.8 2.9-28.4 8.6-46.7 29.1-64.6Z"
          stroke="currentColor"
          strokeWidth="0.6"
        />
      </svg>
      <svg className="ambient__shape ambient__shape--b" viewBox="0 0 200 200" fill="none">
        <path
          d="M160.3 52.6c16.1 21.6 20.4 55.7 6.4 80.6-14 24.9-46.3 40.6-76.4 38.7-30.1-1.9-58-21.4-65.4-47.3-7.4-25.9 5.7-58.2 27.5-78.4 21.8-20.2 52.3-28.3 74.3-21.9 22 6.4 17.5 6.7 33.6 28.3Z"
          stroke="currentColor"
          strokeWidth="0.6"
        />
      </svg>
    </div>
  );
}
