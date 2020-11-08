import React from "react";
import ReactDOM from "react-dom";

function LandingPage() {
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">LOGIN PAGE COMPONENT</div>

                        <div className="card-body">I AM LOGIN PAGE</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;

if (document.getElementById("landingpage")) {
    ReactDOM.render(<LandingPage />, document.getElementById("landingpage"));
}
