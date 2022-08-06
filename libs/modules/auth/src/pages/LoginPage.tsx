import { RouteComponent } from "@lana/core";
import {
  Button,
  Checkbox,
  DarkmodeSwitch,
  Divider,
  ErrorMessage,
  Focus,
  Input,
} from "@lana/components";
import { AuthModule } from "..";
import { ArrowRight, Loader } from "react-feather";
import { ReactComponent as GoogleLogo } from "../assets/google-logo.svg";
import { ReactComponent as AppleLogo } from "../assets/apple-logo.svg";
import { ReactComponent as FacebookLogo } from "../assets/facebook-logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export const LoginPage: RouteComponent<AuthModule> = () => {
  const { t } = useTranslation();

  const loginSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string()
          .email(t("errors.emailWrongFormat"))
          .required(t("errors.emailRequired")),
        password: Yup.string().required(t("errors.passwordRequired")),
        keepMeSignedIn: Yup.boolean(),
      }),
    [t],
  );

  const [isLoading, setLoading] = useState(false);
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null,
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      keepMeSignedIn: false,
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setLoading(true);
      console.log(values);
      setServerErrorMessage(null);
      setTimeout(() => {
        setLoading(false);
        setServerErrorMessage(t("errors.invalidCredentials"));
      }, 3000);
    },
  });

  return (
    <div className="w-full h-full bg-slate-200 dark:bg-slate-900 flex flex-col items-start md:items-center md:justify-center p-4 gap-4">
      <div className="md:absolute top-4 left-4">
        <DarkmodeSwitch />
      </div>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-primary-600 max-w-sm mx-auto md:max-w-xl w-full dark:bg-slate-700 flex flex-col-reverse md:flex-row overflow-auto rounded-lg shadow-2xl"
      >
        <div className="w-full md:w-64 text-white flex flex-col items-center p-3 md:px-8 md:py-12 justify-between">
          <div className="hidden md:block text-3xl font-bold">
            {t("welcomeBack")}
          </div>
          <div className="">
            <span>{t("dontHaveAnAccount")} </span>
            <a href="/register" className="underline">
              {t("requestNewAccount")}
            </a>
          </div>
        </div>
        <div className="h-full overflow-auto bg-white dark:text-white dark:bg-slate-800 rounded-b-lg md:rounded-l-lg md:max-w-sm w-full px-8 py-12 flex flex-col gap-8">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-primary select-none flex items-center justify-center px-4 h-12 rounded text-white text-4xl font-bold -skew-x-12">
              lana
            </div>
            <h1 className="font-bold text-2xl">{t("signIn")}</h1>
            <div className="text-center">{t("signInDescription")}</div>
          </div>
          <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
            <Input
              autoFocus
              id="email"
              label={t("email")}
              onFormikChange={formik.handleChange}
              value={formik.values.email}
              errorMessage={
                formik.errors.email && formik.touched.email ? (
                  <div>{formik.errors.email}</div>
                ) : null
              }
            />
            <Input
              id="password"
              label={t("password")}
              type="password"
              onFormikChange={formik.handleChange}
              value={formik.values.password}
              errorMessage={
                formik.errors.password && formik.touched.password ? (
                  <div>{formik.errors.password}</div>
                ) : null
              }
            />

            <Checkbox
              name="keepMeSignedIn"
              isSelected={formik.values.keepMeSignedIn}
              onFormikChange={formik.handleChange}
            >
              {t("keepMeSignedIn")}
            </Checkbox>
            <ErrorMessage message={serverErrorMessage} />
            <Button isDisabled={isLoading} type="submit">
              <span>{t("signIn")}</span>
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 1,
                  }}
                >
                  <Loader />
                </motion.div>
              ) : (
                <ArrowRight />
              )}
            </Button>
          </form>
          <Divider text={t("orLoginWith")} />
          <div className="flex items-center justify-center gap-4">
            <div>
              <Focus
                className="rounded-full"
                focusClassName="focus-within:shadow-red-500/40"
              >
                <button className="w-16 h-16 rounded-full flex items-center justify-center bg-red-500 text-white">
                  <GoogleLogo className="w-10 h-10" />
                </button>
              </Focus>
            </div>
            <div>
              <Focus
                className="rounded-full"
                focusClassName="focus-within:shadow-black/20 dark:focus-within:shadow-white/20"
              >
                <button className="w-16 h-16 rounded-full flex items-center justify-center bg-black dark:bg-white text-white dark:text-black">
                  <AppleLogo className="w-10 h-10" />
                </button>
              </Focus>
            </div>
            <div>
              <Focus
                className="rounded-full"
                focusClassName="focus-within:shadow-blue-500/40"
              >
                <button className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-500 text-white">
                  <FacebookLogo className="w-10 h-10" />
                </button>
              </Focus>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
