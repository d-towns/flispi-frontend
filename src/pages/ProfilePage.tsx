import React, { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import parseISO from "date-fns/parseISO";
import { UserIcon } from '@heroicons/react/20/solid'
import GridList from "../components/GridList";
import { Property } from "../models/Property.model";
import { getFavoriteProperties } from "../services/property.service";
import { useAuth0 } from "@auth0/auth0-react";


const ProfilePage = () => {
    const { user, loginWithRedirect } = useAuth0()
    const [favoriteProperties, setFavoriteProperties] = useState<Property[]>([])

    const handlePasswordReset = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: "/profile",
          },
        });
      };
    

    useEffect(() => {
        
        getFavoriteProperties(user?.sub || '').then((response) => {
            
            setFavoriteProperties(response.properties)
        })
    }, [user]);

    return (
        <div className="container mx-auto my-5 p-5">
            <div className="md:flex no-wrap md:-mx-2 ">

                <div className="w-full md:w-3/12 md:mx-2">

                    <div className="bg-white p-3 border-t-4 border-[#003366]">
                        <div className="image overflow-hidden">
                        </div>
                        <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{user?.nickname}</h1>
                        <span className="text-gray-600 font-lg text-semibold leading-6"></span>
                        <p className="text-sm text-gray-500 hover:text-gray-600 leading-6"></p>
                        <ul
                            className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                            <li className="flex items-center py-3">
                                <span>Status</span>
                                <span className="ml-auto"><span
                                    className="bg-[#003366] py-1 px-2 rounded text-white text-sm">Active</span></span>
                            </li>
                            <li className="flex items-center py-3">
                                <span>Member since</span>
                                <span className="ml-auto"> {user?.updated_at && formatInTimeZone(parseISO(user.updated_at), 'America/New_York', 'MMM yyyy')}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="w-full md:w-9/12 mx-2 h-64">

                    <div className="bg-white p-3 shadow-lg rounded-lg">
                        <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                            <span className="text-[#003366]">
                                <UserIcon className="h-5 w-5" />
                            </span>
                            <span className="tracking-wide">Account Info</span>
                        </div>
                        <div className="text-gray-700">
                            <div className="grid md:grid-cols-2 text-sm">
                                <div className="flex">
                                    <div className="px-2 py-2 w-fit font-semibold">Email</div>
                                    <div className="px-2 py-2">
                                        <a className="text-blue-800" href="mailto:jane@example.com">{user?.email}</a>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2">
                                    <div className="px-2 py-2 font-semibold">Email Verified</div>
                                    <div className="px-2 py-2"><span
                                    className="bg-[#003366] py-1 px-2 rounded text-white text-sm">{String(user?.email_verified).toUpperCase()}</span></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-5">
                        <button
                            onClick={handlePasswordReset}
                            className="block border border-gray-100 rounded-lg w-full text-[#003366] transition ease-in-out duration-200 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                            Reset Password</button>
                            <button
                            className="block border border-gray-100 rounded-lg w-full text-red-800 transition ease-in-out duration-200 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                            Deactivate Account</button>
                            </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-full mx-2 h-full md:my-4 my-20">
                <div className="bg-white p-3 shadow-lg rounded-lg">
                <h2 className="text-gray-900  text-center font-bold text-xl leading-8 my-1 border-b-4 border-[#003366] pb-4">Saved Properties</h2>
                    <GridList currentPage={favoriteProperties} />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage;