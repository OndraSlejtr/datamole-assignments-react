import { useState } from "react";

export const useToggle = (defaultValue = false) => {
    const [isToggledOn, setToggleOn] = useState(defaultValue);
    const toggle = () => setToggleOn((isToggledOn) => !isToggledOn);

    return { isToggledOn, toggle };
};
