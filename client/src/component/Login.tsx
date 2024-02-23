function Login({ children }: any) {
  return (
    <section>
      <div className="w-full h-screen py-8 flex items-center justify-center px-4 md:px-0 ">
        <div className="w-full lg:w-[32vw] min-h-[40vh] flex flex-col  bg-white rounded-lg py-2 overflow-hidden">
          {children}
        </div>
      </div>
    </section>
  );
}

export default Login;
