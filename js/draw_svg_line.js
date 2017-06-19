 
	function draw_lines() {
        //initial start point ..from state name
        point_x1 = 112;
        point_y1 = 106;

        //1st mid point for turn to bring on the center line.
        point_x2 = 112;
        point_y2 = 47;

        //end point.
        point_x3 = 284;
        point_y3 = 47;

        var bgsvg = d3.select("#myBgSvg");

        bgsvg.append("circle")
            .attr("class", "animate-circle-1")
            .attr("cx", point_x1)
            .attr("cy", point_y1)
            .style("fill", "#F4AC00")
            .attr("r", 5)


        var line_C_1 = bgsvg.append("line")
            .attr("class", "line-animate c-1")
            .attr("x1", point_x1)
            .attr("y1", point_y1)
            .attr("x2", point_x1)
            .attr("y2", point_y1)
            .style("stroke", "#F4AC00");
        line_C_1.transition()
            .duration("800")
            .delay("200")
            .attr("x2", point_x2)
            .attr("y2", point_y2)


        setTimeout(function () {

            var line_C_2 = bgsvg.append("line")
                .attr("class", "line-animate c-2")
                .attr("x1", point_x2)
                .attr("y1", point_y2)
                .attr("x2", point_x2)
                .attr("y2", point_y2)
                .style("stroke", "#F4AC00");
            line_C_2.transition()
                .duration("800")
                .delay("200")
                .attr("x2", point_x3)
                .attr("y2", point_y3)


            setTimeout(function () {
                bgsvg.append("circle")
                    .attr("class", "animate-circle-1")
                    .attr("cx", point_x3)
                    .attr("cy", point_y3)
                    .style("fill", "#F4AC00")
                    .attr("r", 5)
            }, 800)

        }, 800)

    }