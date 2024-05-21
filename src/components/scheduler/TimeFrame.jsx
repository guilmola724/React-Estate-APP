const FullFrame = ({ styles, id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText }) => {
    const frames = endTime - startTime;

    return (
        <article
            draggable
            onDragStart={handleDragStart(id, frames)}
            onDragEnd={handleDragEnd}
            style={{
                gridColumn: `${startTime + 2} / ${endTime + 2}`,
                gridRowStart: `${2 + index}`,
                background: "lightblue",
                zIndex: 1,
            }}
            className={styles.timeFrame}
        >
            {frameText}
        </article>
    );
};

const StartFrame = ({ styles,id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText }) => {
    const frames = endTime;
    console.log(frames);

    return (
        <article
            draggable
            onDragStart={handleDragStart(id, frames)}
            onDragEnd={handleDragEnd}
            style={{
                gridColumn: `${2} / ${endTime + 2}`,
                gridRowStart: `${2 + index}`,
                background: "lightblue",
                zIndex: 1,
            }}
            className={styles.startTimeFrame}
        >
            {frameText}
        </article>
    );
};

const EndFrame = ({ styles,id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText }) => {
    const frames = 24 - startTime;

    return (
        <article
            draggable
            onDragStart={handleDragStart(id, frames)}
            onDragEnd={handleDragEnd}
            style={{
                gridColumn: `${startTime + 2} / ${26}`,
                gridRowStart: `${2 + index}`,
                background: "lightblue",
                zIndex: 1,
            }}
            className={styles.endTimeFrame}
        >
            {frameText}
        </article>
    );
};

const TimeFrame = ({ styles, id, handleDragEnd, handleDragStart, startTime, endTime, index, frameText, frameType }) => {
    const TimeFrameComponent = frameType === "full" ? FullFrame : frameType === "start" ? StartFrame : EndFrame;

    return (
        <TimeFrameComponent
            styles={styles}
            id={id}
            handleDragEnd={handleDragEnd}
            handleDragStart={handleDragStart}
            startTime={startTime}
            endTime={endTime}
            index={index}
            frameText={frameText}
            frameType={frameType}
        />
    );
};

export default TimeFrame