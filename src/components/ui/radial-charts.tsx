"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with text"

const chartData = [
  // ATS score (0-100) used for the radial chart; RadialBar uses the gradient fill
  { browser: "safari", atsScore: 85 },
]

const chartConfig = {
  atsScore: {
    label: "ATS Score",
  },
  safari: {
    label: "Safari",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ScoreChart() {
  return (
    <div className="mx-auto max-w-[320px]">
      {/* larger fixed size so the chart appears bigger in the ATS overview */}
      <ChartContainer config={chartConfig} className="mx-auto w-72 h-72">
        <RadialBarChart
          data={chartData}
          startAngle={0}
          endAngle={250}
          innerRadius={90}
          outerRadius={130}
        >
          <defs>
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#9342FF" />
              <stop offset="100%" stopColor="#4A00AE" />
            </linearGradient>
          </defs>

          <PolarGrid gridType="circle" radialLines={false} stroke="none" polarRadius={[110, 96]} />
          {/* use the gradient for the radial bar - now bound to atsScore */}
          <RadialBar dataKey="atsScore" cornerRadius={10} fill="url(#primaryGradient)" />

          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-4xl font-bold">
                        {`${chartData[0].atsScore.toLocaleString()}%`}
                      </tspan>
                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 28} className="fill-muted-foreground">
                        ATS Score
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
    </div>
  )
}
