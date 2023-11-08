import { Helmet } from "react-helmet-async";

const Blogs = () => {
    return (
        <div className="mx-auto w-11/12 ">
            <Helmet>
                <title>Remoto | Blogs</title>
            </Helmet>
            <div>
                {/* first */}
                <div className="flex flex-col-reverse md:flex-row justify-between md:gap-16 my-3 md:my-6 border py-6 md:py-12 rounded px-7 ">
                    <div className="flex-1">
                        <h1 className="text-3xl font-semibold">
                            What is an access token and refresh token? How do they work and where should we
                            store them on the client-side?
                        </h1>
                        <div className="mt-5 flex-col flex gap-5">
                            <p>
                                <span className="text-2xl font-semibold text-blue-700">An access</span> token is a credential used to access protected resources.The token usually has a limited lifetime, which ensures that if the token is intercepted or misused, it won't be valid forever. An access token can come in various forms, such as a cryptographic key, a token string, or a token handle.
                            </p>
                            <p>
                                <span className="text-2xl font-semibold text-blue-700">An refresh</span> token is used to obtain a renewed access token  that is, a new access token with a new expiry time  when the current access token becomes invalid or expires. This is helpful because it allows the client to obtain a new access token without prompting the user for their credentials again.
                            </p>
                            <p>
                                <span className="text-2xl font-semibold text-blue-500">On the client side</span>, access tokens should be stored in memory and not persisted between sessions to prevent access by malicious scripts. Refresh tokens, if used on the client side, should be stored securely in HttpOnly cookies or equivalent secure storage that is not accessible via JavaScript to protect against cross-site scripting (XSS) attacks.
                            </p>

                        </div>
                    </div>
                    <div className="" >
                        <img className="w-96" src="https://cdn-icons-png.flaticon.com/512/5767/5767852.png" alt="" />
                    </div>
                </div>
                {/* second */}
                <div className="flex flex-col-reverse md:flex-row justify-between md:gap-16 my-3 md:my-6 border py-6 md:py-12 rounded px-7 ">
                    <div className="flex-1">
                        <h1 className="text-3xl font-semibold">
                            What is Nest Js ? What is Express Js?
                        </h1>
                        <div className="mt-5 flex-col flex gap-5">
                            <p>
                                <span className="text-2xl font-semibold text-blue-700">Both </span>
                                 Nest js and Express js are popular Node.js frameworks for building web applications
                            </p>
                            <p>
                                <span className="text-2xl font-semibold text-blue-700">Nest JS </span> is an opinionated framework, which means that it has a strong set of conventions and best practices that developers are encouraged to follow. This can make it easier to learn and use, and it can also lead to more maintainable code. However, it can also be less flexible than other frameworks, and it may not be a good choice for projects that require a lot of customization.
                            </p>
                            <p>
                                <span className="text-2xl font-semibold text-blue-500">Express JS </span>is an unopinionated framework, which means that it does not impose any particular structure on code. This can make it more flexible than other frameworks, but it can also make it more difficult to learn and use. Additionally, it can lead to less maintainable code, especially in large projects. and it is also lightweight and flexible Node.js web application framework that provides a comprehensive suite of features for building web and mobile applications. It is easy to learn, use, and scale, and it has a large community of developers and extensive documentation.
                            </p>

                        </div>
                    </div>
                    <div className="" >
                        <img className="w-96" src="https://z-p3-scontent.fdac12-1.fna.fbcdn.net/v/t1.15752-9/370336283_1357459981545107_7869963061585560790_n.png?_nc_cat=102&ccb=1-7&_nc_sid=8cd0a2&_nc_eui2=AeG9bganyTnMkSY76W9LJmUjsxIMqNm156WzEgyo2bXnpSqUF01HIIDSzSeL-ip5UvDmmPvjeq9LWzdHd-nsgHcN&_nc_ohc=xswthOGnav8AX8O8lx_&_nc_ht=z-p3-scontent.fdac12-1.fna&oh=03_AdTyKmLVnTiwTOhUswc5yWZKfHHl-lYDS3v5qb4y0ZjKvw&oe=65730D4B" alt="" />
                    </div>
                </div>
                {/* first */}
                <div className="flex flex-col-reverse md:flex-row justify-between md:gap-16 my-3 md:my-6 border py-6 md:py-12 rounded px-7 ">
                    <div className="flex-1">
                        <h1 className="text-3xl font-semibold">
                            Full project code short explanation .
                        </h1>
                        <div className="mt-5 flex-col flex gap-5">
                            <p>
                                <span className="text-2xl font-semibold text-blue-700">Client side : </span> My project utilizes React for front-end development, leveraging its component-based approach and declarative nature. Tailwind CSS and Daisy UI contribute to visual appeal and responsiveness, while Font Awesome and React Helmet enhance functionality.
                            </p>
                            <p>
                                <span className="text-2xl font-semibold text-blue-700">Server side : </span> My project's backend infrastructure relies on Node.js, a JavaScript runtime environment that empowers server-side development. Express.js, a popular Node.js framework, facilitates the creation of a robust and scalable API. CORS middleware ensures seamless cross-origin resource sharing, while JSON Web Tokens (JWTs) enable secure user authentication and authorization. The server is deployed on Vercel, a cloud platform specifically designed for deploying serverless applications.
                            </p>
                            <p>
                                <span className="text-2xl font-semibold text-blue-500">Database : </span>My project's database infrastructure utilizes MongoDB, a NoSQL database that stores data in flexible JSON-like documents. It provides a powerful and scalable solution for managing data in web applications. JWT verification is used to ensure that only authorized users can access their own job data.
                            </p>

                        </div>
                    </div>
                    <div className="" >
                        <img className="w-96 h-96" src="https://marketingweek.imgix.net/content/uploads/2017/05/12103909/Coding-body-image-.jpg?auto=compress,format&q=60&w=750&h=460" alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blogs;