
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"

 function SignUp() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
      <div className="container grid gap-6 px-4 md:px-6 lg:grid-cols-2 xl:gap-12">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Join our Fitness Community</h2>
            <p className="text-gray-500 md:text-xl dark:text-gray-400">
              Access custom workout plans, track your nutrition, and monitor your progress.
            </p>
          </div>
          <div className="flex flex-col space-y-2">
            <form className="grid gap-2">
              <div className="grid sm:grid-cols-2 gap-2">
                <label className="text-sm" htmlFor="name">
                  Name
                </label>
                <Input id="name" placeholder="Enter your name" />
                <label className="text-sm" htmlFor="email">
                  Email
                </label>
                <Input id="email" placeholder="Enter your email" type="email" />
                <label className="text-sm" htmlFor="password">
                  Password
                </label>
                <Input id="password" placeholder="Enter your password" type="password" />
              </div>
              <Button size="lg">Sign Up</Button>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img
            alt="Fitness"
            className="aspect-video overflow-hidden rounded-xl object-cover object-center"
            height="300"
            src="/placeholder.svg"
            width="500"
          />
        </div>
      </div>
    </section>
  )
};


export default SignUp;
