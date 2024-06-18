"use client"

import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { MockInterview } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import { Lightbulb, WebcamIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'

const Interview = ({params}) => {

    const [interviewData,setInterviewData]=useState()

    const [webCamEnable,setWebCamEnable]=useState(false)

    useEffect(()=>{
        console.log(params.interviewId)
        getData()
    },[])

    const getData=async()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId,params.interviewId))

        console.log("res",result)
        setInterviewData(result[0])
    }

  return (
    <div className='my-10'>
     <h2 className='font-bold text-2xl'>Let's get Started</h2>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

   

    <div className='flex flex-col my-5 gap-5 p-5 rounded-lg border'>
       <div className='flex flex-col p-5 rounded-lg border gap-5'>

        <h2><strong>Job Role/Job Position:</strong>{interviewData?.jobPosition}</h2>
        <h2><strong>Job Description/Tech Stack:</strong>{interviewData?.jobDesc}</h2>
        <h2><strong>Years of Experience:</strong>{interviewData?.jobExperience}</h2>
       </div>

       <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
       <h2 className='flex gap-2 items-center text-yellow-500'>
         <Lightbulb /><strong>Information</strong>
        </h2>
        <h2 className='mt-3 text-yellow-500'>
            Enable Video Web Camera and Microphone to Start your AI Generated Mock Interview . It has 5 question which you can answer and at the last you will get the report on the basis of your answer. NOTE: We never record your video, Web camera access you disabled at any time if you want ...
        </h2>
       </div>
    </div>

    <div>
     {webCamEnable ? 
           <Webcam style={{height:300,width:300}}
           onUserMedia={()=>setWebCamEnable(true)}
           onUserMediaError={()=>setWebCamEnable(false)}
           mirrored={true}
           />
           :
           <>
        <WebcamIcon
         className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
        <Button
        variant="ghost"
        className="w-full"
        onClick={()=>setWebCamEnable(true)}
        >Enable Web Camera and Microphone</Button>
         </>
        }
    </div>

    </div>

        <div className='flex justify-end items-end'>
            <Link href={`/dashboard/interview/${params.interviewId}/start`}>
    <Button>Start Interview</Button>
            </Link>
        </div>
  
    </div>
  )
}

export default Interview
