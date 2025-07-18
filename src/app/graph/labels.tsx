import { usePx } from "hooks/usePx";
import { DomainRange } from ".";
import React from "@rbxts/react";
import { COLORS } from "colors";
import { AsPosition, FormatNumber, InIncrements } from "./computation";
import {
  DOMAIN_LABELS,
  LABEL_TEXT_SIZE,
  LABEL_THICKNESS,
  RANGE_LABELS,
} from "configurations";

export function Labels(props: {
  domainRange: DomainRange;
  XPrefix?: string;
  YPrefix?: string;
}) {
  const px = usePx();
  const { DomainMin, DomainMax, Domain, RangeMin, RangeMax, Range } =
    props.domainRange;

  return (
    <>
      {/* Domain tags + grid lines */}
      {InIncrements(DomainMin, DomainMax, Domain, DOMAIN_LABELS).map(
        (value, index) => {
          return (
            <>
              <textlabel
                Font={Enum.Font.Code}
                Text={FormatNumber(value, props.XPrefix)}
                Size={new UDim2(LABEL_THICKNESS, 0, LABEL_THICKNESS, 0)}
                Position={
                  new UDim2(
                    AsPosition(DomainMin, DomainMax, value) -
                      LABEL_THICKNESS / 2,
                    0,
                    1,
                    0,
                  )
                }
                BackgroundTransparency={1}
                TextColor3={COLORS.Text}
                TextSize={px(LABEL_TEXT_SIZE)}
                TextXAlignment="Center"
                TextYAlignment="Center"
              />
              <frame
                Size={new UDim2(0, 1, 1, 0)}
                Position={
                  new UDim2(AsPosition(DomainMin, DomainMax, value), 0, 0, 0)
                }
                BackgroundColor3={COLORS.Border}
                BorderSizePixel={0}
                ZIndex={1}
              />
            </>
          );
        },
      )}
      {/* Range tags + grid lines */}
      {InIncrements(RangeMin, RangeMax, Range, RANGE_LABELS).map((value) => {
        return (
          <>
            <textlabel
              Font={Enum.Font.Code}
              Text={FormatNumber(value, props.YPrefix)}
              Size={new UDim2(LABEL_THICKNESS, 0, LABEL_THICKNESS, 0)}
              Position={
                new UDim2(
                  -LABEL_THICKNESS,
                  0,
                  AsPosition(RangeMin, RangeMax, value, true) -
                    LABEL_THICKNESS / 2,
                  0,
                )
              }
              BackgroundTransparency={1}
              TextColor3={COLORS.Text}
              TextSize={px(LABEL_TEXT_SIZE)}
              TextXAlignment="Center"
              TextYAlignment="Center"
            />
            <frame
              Size={new UDim2(1, 0, 0, 1)}
              Position={
                new UDim2(0, 0, AsPosition(RangeMin, RangeMax, value, true), 0)
              }
              BackgroundColor3={COLORS.Border}
              BorderSizePixel={0}
              ZIndex={1}
            />
          </>
        );
      })}
    </>
  );
}
