import KnowMoreButton from "../Utils/KnowMoreButton";

export default function StepsCard({
  number,
  title,
  description,
  heading,
  desc,
  button,
  route,
  image,
  css,
  bcolor,
}) {
  return (
    <div className="flex flex-col justify-center items-center bg-slate-200 pb-4">
      <div
        className={`flex text-xl rounded-full border justify-center items-center h-[50px] w-[50px] border-${bcolor} mt-20`}
      >
        <span className="text-2xl text-blue-400">{number}</span>
      </div>
      <div>
        <h1 className="text-[6vw] sm:text-[4vw] font-serif">{title}</h1>
      </div>
      <div>
        <h1 className="text-[4vw] sm:text-[2vw]">{description}</h1>
      </div>
      <div
        className={`flex flex-col md:flex-row ${css} border rounded-3xl w-11/12 md:w-4/5 p-6 sm:p-10 mt-10 bg-gradient-to-br from-white to-blue-600`}
      >
        <div className="flex flex-col w-full md:w-1/2 gap-6 items-center justify-center">
          <div>
            <h1 className="text-[5vw] sm:text-[3vw] font-semibold">{heading}</h1>
          </div>
          <div className="flex flex-wrap">
            <h1 className="text-[2vw] sm:text-[1vw] font-medium">{desc}</h1>
          </div>
          <div>
            <KnowMoreButton title={button} route={route} />
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
          <img src={image} className="h-[30vh] md:h-[40vh] w-auto rounded-xl" />
        </div>
      </div>
    </div>
  );
}
