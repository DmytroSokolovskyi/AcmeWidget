import type {ButtonHTMLAttributes} from 'react'
import {cn} from '../../utils/cn'

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "sm" | "md";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
};

const variantMap: Record<ButtonVariant, string> = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring",
    secondary: "bg-background text-foreground border border-input hover:bg-accent hover:text-accent-foreground focus-visible:ring-ring",
    danger: "bg-danger text-primary-foreground hover:bg-danger/90 focus-visible:ring-ring",
};

const sizeMap: Record<ButtonSize, string> = {
    sm: "h-6 px-3 text-xs",
    md: "h-8 px-4 text-sm",
};

export function Button({
                           className,
                           variant = "primary",
                           size = "md",
                           type = "button",
                           ...props
                       }: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(
                "inline-flex items-center justify-center rounded-lg font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                "disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
                variantMap[variant],
                sizeMap[size],
                className
            )}
            {...props}
        />
    );
}
