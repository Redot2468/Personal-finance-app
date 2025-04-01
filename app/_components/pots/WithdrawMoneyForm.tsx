"use client";

import FormOverview from "@/app/_components/pots/FormOverview";
import PotsFormInput from "@/app/_components/pots/PotsFormInput";
import { addBudgetAction } from "@/app/_lib/actions/dashboardActions";
import {
  getPotsSliceReducer,
  onUpdateAddPotModalOpening,
} from "@/app/_lib/redux/potsSlice";
import cancelIcon from "@/public/icon-close-modal.svg";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export default function WithdrawMoneyForm() {
  const [state, formAction, isAddingBudget] = useActionState(
    addBudgetAction,
    null,
  );

  const { errors, inputs } = state ?? {};

  const { isAddNewPotModalOpen } = useSelector(getPotsSliceReducer);
  const dispatch = useDispatch();
  const [amountToWithdraw, setAmountToWithdraw] = useState(100);

  useEffect(() => {
    function onBlurModal(e: Event) {
      const target = e.target as HTMLElement;
      if (!target.closest(".form-block") && !target.closest(".btn-add-pot")) {
        dispatch(onUpdateAddPotModalOpening(false));
      }
    }

    window.addEventListener("click", onBlurModal);

    return () => window.removeEventListener("click", onBlurModal);
  }, [dispatch]);

  useEffect(() => {
    if (state) {
      if (state?.success) {
        toast.success(state?.message);
        dispatch(onUpdateAddPotModalOpening(false));
      } else if (state?.success === false) {
        toast.error(state?.message);
      }
    }
  }, [state, dispatch]);

  return (
    <AnimatePresence>
      {/* {isAddNewPotModalOpen && ( */}
      <motion.div
        className={`form fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center overflow-hidden bg-black/20 px-6 backdrop-blur-[2px]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: "easeIn", duration: 0.2 }}
      >
        {/* Form block */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ ease: "easeIn" }}
          className={`form-block max-w-[560px] space-y-5 rounded-xl bg-white px-5 py-6 shadow-md md:px-8 md:py-8`}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-preset-1-2 text-grey-900 border capitalize">
              withdraw <span className="lowercase">from </span>{" "}
              &lsquo;savings&rsquo;
            </h2>

            <Image
              src={cancelIcon}
              alt="cancel-icon"
              className="cursor-pointer"
              onClick={() => dispatch(onUpdateAddPotModalOpening(false))}
            />
          </div>
          <p className="text-preset-4 text-grey-500">
            Withdraw from your pot to put money back in your main balance. This
            will reduce the amount you have in this pot.
          </p>

          <FormOverview
            potTheme={{ bg: "bg-red", text: "text-red" }}
            amountToWithdraw={amountToWithdraw}
          />

          {/* form */}
          <form action={formAction} autoComplete="on" className="space-y-4">
            <PotsFormInput
              htmlFor="amountToAdd"
              label="Amount to Withdraw"
              error={errors?.maxSpending?.at(0)}
            >
              <p className="text-beige-500 text-preset-4">$</p>
              <input
                type="number"
                name="amountToWithdraw"
                id="amountToWithdraw"
                autoComplete="amountToWithdraw"
                defaultValue={(inputs?.maxSpending as number) ?? 5}
                aria-label="amount to withdraw"
                aria-live="polite"
                className="basic-input"
                placeholder="e.g 2000"
                disabled={isAddingBudget}
                aria-disabled={isAddingBudget}
                aria-describedby="amountToWithdraw-error"
                aria-invalid={!!errors?.maxSpending}
                min={5}
              />
            </PotsFormInput>

            <button
              className="btn btn-primary flex w-full justify-center capitalize disabled:opacity-80"
              disabled={isAddingBudget}
            >
              {isAddingBudget ? (
                <span className="italic">Adding Amount...</span>
              ) : (
                "Confirm Addition"
              )}
            </button>
          </form>
        </motion.div>
      </motion.div>
      {/* )} */}
    </AnimatePresence>
  );
}

// if the amount to withdraw,is greater than the current amount in pot, display an error
