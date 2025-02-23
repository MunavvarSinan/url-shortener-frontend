import { cva, VariantProps } from "class-variance-authority";

const iconVariants = cva("", {
    variants: {
        size: {
            xs: "size-3",
            sm: "size-3.5",
            base: "size-4",
            lg: "size-5",
            xl: "size-6",
            "2xl": "size-7",
            "3xl": "size-8",
            "4xl": "size-9",
            "5xl": "size-10",
        },
    },
    defaultVariants: {
        size: "base",
    },
});

export type IconVariants = VariantProps<typeof iconVariants>;

export { iconVariants };