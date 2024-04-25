import SearchBox from "./SearchBox";

const Container = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="content-cont flex flex-col sm:w-[34.3rem] md:w-[71.9rem] lg:w-[124rem]">
        <SearchBox />

        {children}
      </div>
    </div>
  );
};

export default Container;
