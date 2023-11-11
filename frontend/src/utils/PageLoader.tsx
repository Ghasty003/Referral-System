import { BallTriangle } from "react-loader-spinner";

function PageLoader() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <BallTriangle
                height={100}
                width={100}
                radius={5}
                color="#4fa94d"
                ariaLabel="ball-triangle-loading"
                visible={true}
            />
        </div>
    );
}

export default PageLoader;