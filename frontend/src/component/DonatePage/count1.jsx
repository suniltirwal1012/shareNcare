import React from "react";

function Count1() {
  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="stat">
          <div className="stat-title">Donations</div>
          <div className="stat-value">31K</div>
          <div className="stat-desc">From January 1st to February 1st</div>
        </div>

        <div className="stat">
          <div className="stat-title">Users</div>
          <div className="stat-value text-secondary">4,200</div>
          <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">Volunteers</div>
          <div className="stat-value">1,200</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>
  );
}

export default Count1;
