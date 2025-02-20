const NotFound = () => {
  return (
    <div className="not-found-wrap">
      <div className="bigs-boxes">
        <div className="outside relative">
          <div className="inside absolute">
            <div className="flex-inline gap-16 align-baseline">
              <h1 className="logo-font">B</h1>
            </div>
          </div>
        </div>
        <p className="title-1 flex-inline gap-8 align-baseline">
          404
          <span className="text-1">Not Found</span>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
