function Button({children, textOnly, className, ...props}) {
    let cssClasses = textOnly === true ? 'text-button' : 'button';
    cssClasses += ' ' + className;
    return <button className={cssClasses} {...props}>{children}</button>
}

export default Button;