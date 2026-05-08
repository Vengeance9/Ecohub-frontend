"use client"
import { getIdeaByIdAction } from "@/_actions/idea.action";
import { payAction } from "@/_actions/payment.actions"
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation"

export default function Page(){
    const{id} = useParams()

    const { data:idea, error, isLoading:ideaLoading } = useQuery({
      queryKey: ["idea", id],
      queryFn: () => getIdeaByIdAction(id as string),
    });

    const { mutate: pay, isPending: isPayPending } = useMutation({
      mutationFn: (price:number) =>
        payAction(id as string, price),
      onSuccess: (result) => {
        window.location.href = result.data.data.paymentUrl;
      },
      onError: (error) => {
        console.log(error);
      },
    });

    if(ideaLoading){
        return (
            <div>Loading...</div>
        )
    }
    

    return (
        <div>
            <h1>Purchase Idea</h1>
            <h1>Title: {idea?.data?.result?.title}</h1>
            <h1>Price: {idea?.data?.result?.price}</h1>
            <Button onClick={() => pay(idea.data.result.price)} disabled={isPayPending}>{isPayPending ? "Paying..." : "Pay"}</Button>
        </div>
    )
}