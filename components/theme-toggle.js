import React, {useContext, useEffect} from "react";
import { IconButton, useColorMode, ScaleFade, Tooltip } from "@chakra-ui/react";
import { SunOutline, MoonOutline } from "heroicons-react";
import useSound from "use-sound";
import MobileMenuButton from "./mobile-menu-button";
import LightSoundContext from "@/components/light-sound-context";

const ThemeToggle = ({ mobile }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const [play] = useContext(LightSoundContext);

  const handleClick = () => {
    toggleColorMode();
    colorMode === "dark" ? play({ id: "on" }) : play({ id: "off" });
  };

  return (
      <Tooltip
          label={colorMode === "dark" ? "Clarear" : "Escurecer"}
          aria-label="A tooltip"
      >
      <span>

      {mobile ? (
          <MobileMenuButton
              label={colorMode === "dark" ? "Clarear" : "Escurecer"}
              icon={
                colorMode === "dark" ? (
                    <ScaleFade in>
                      <SunOutline size={mobile ? 22 : 18} />
                    </ScaleFade>
                ) : (
                    <ScaleFade in>
                      <MoonOutline size={mobile ? 22 : 18} />
                    </ScaleFade>
                )
              }
              onClick={handleClick}
          />
      ) : (
          <IconButton
              isRound
              aria-label="Trocar tema da página"
              variant={mobile ? "ghost" : undefined}
              icon={
                colorMode === "dark" ? (
                    <ScaleFade in>
                      <SunOutline size={mobile ? 22 : 18} />
                    </ScaleFade>
                ) : (
                    <ScaleFade in>
                      <MoonOutline size={mobile ? 22 : 18} />
                    </ScaleFade>
                )
              }
              onClick={handleClick}
          />
      )}
      </span>
      </Tooltip>
  );
};
export default ThemeToggle;
